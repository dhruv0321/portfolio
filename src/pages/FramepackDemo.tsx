import { useState, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import Layout from '../components/Layout';
import { serializeFrame, deserializeFrame, FrameType, FrameView, Flags } from 'framepack';
import type { DecodedFrame, FrameInput } from 'framepack';

// ─── Types ────────────────────────────────────────────────────────────────────

type PayloadKind = 'none' | 'text' | 'json' | 'binary';

interface FrameOptions {
  frameType: number;
  payloadKind: PayloadKind;
  payloadText: string;
  withTimestamp: boolean;
  withSequence: boolean;
  sequenceNum: number;
  withMetadata: boolean;
  metadataText: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const FRAME_TYPES: { label: string; value: number }[] = [
  { label: 'PING (0x00)',    value: FrameType.PING },
  { label: 'MESSAGE (0x01)', value: FrameType.MESSAGE },
  { label: 'ACK (0x02)',     value: FrameType.ACK },
  { label: 'ERROR (0x03)',   value: FrameType.ERROR },
];

const FLAGS_MAP: { bit: number; label: string; desc: string }[] = [
  { bit: Flags.HAS_TIMESTAMP, label: 'HAS_TIMESTAMP', desc: '8-byte float64' },
  { bit: Flags.HAS_SEQUENCE,  label: 'HAS_SEQUENCE',  desc: '4-byte uint32' },
  { bit: Flags.HAS_METADATA,  label: 'HAS_METADATA',  desc: 'uint16 len + msgpack map' },
];

const ENCODING_LABELS: Record<string, string> = {
  none:   '0b11 — NONE',
  binary: '0b00 — BINARY',
  text:   '0b01 — TEXT',
  json:   '0b10 — JSON',
};

function buildPayload(kind: PayloadKind, text: string): unknown {
  if (kind === 'none') return undefined;
  if (kind === 'text') return text;
  if (kind === 'binary') {
    const n = Math.min(parseInt(text) || 8, 128);
    return new Uint8Array(n).map((_, i) => (i * 37 + 91) % 256);
  }
  try { return JSON.parse(text); } catch { return text; }
}

function parseMetadata(text: string): Record<string, unknown> | undefined {
  try { return JSON.parse(text) as Record<string, unknown>; } catch { return undefined; }
}

// Uses FrameView.rawPayload.byteOffset to get the exact payload boundary zero-copy.
function toHexGroups(bytes: Uint8Array): { hex: string; section: 'header' | 'opt' | 'payload' }[] {
  const view = new FrameView(bytes.buffer as ArrayBuffer);
  const payloadStart = view.rawPayload.byteOffset;

  return Array.from(bytes, (byte, i) => ({
    hex: byte.toString(16).padStart(2, '0'),
    section: (i < 2 ? 'header' : i < payloadStart ? 'opt' : 'payload') as 'header' | 'opt' | 'payload',
  }));
}

function jsonSize(payload: unknown): number {
  return new TextEncoder().encode(
    JSON.stringify({ type: 'MESSAGE', timestamp: Date.now(), payload }),
  ).byteLength;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldRow({ name, value, mono = false }: { name: string; value: string; mono?: boolean }) {
  return (
    <div className="flex gap-3 items-baseline py-1 border-b border-slate-800 last:border-0">
      <span className="text-xs text-slate-500 w-28 shrink-0">{name}</span>
      <span className={`text-xs text-green-400 break-all ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}

function HexDisplay({ bytes }: { bytes: Uint8Array }) {
  const groups = toHexGroups(bytes);
  return (
    <div className="font-mono text-xs leading-6 break-all p-3 bg-slate-950 rounded-lg border border-slate-800">
      {groups.map((g, i) => (
        <span
          key={i}
          className={
            g.section === 'header'  ? 'text-purple-400' :
            g.section === 'opt'     ? 'text-amber-400' :
            'text-sky-400'
          }
        >
          {g.hex}{' '}
        </span>
      ))}
      <div className="flex gap-4 mt-2 pt-2 border-t border-slate-800">
        <span className="text-purple-400">■</span><span className="text-slate-500">header</span>
        <span className="text-amber-400">■</span><span className="text-slate-500">optional fields</span>
        <span className="text-sky-400">■</span><span className="text-slate-500">payload</span>
      </div>
    </div>
  );
}

function DecodedPanel({ frame }: { frame: DecodedFrame }) {
  const typeName = Object.entries(FrameType).find(([, v]) => v === frame.type)?.[0]
    ?? `0x${frame.type.toString(16)}`;

  const payloadStr = (() => {
    if (frame.payloadEncoding === 'none')   return '(none)';
    if (frame.payloadEncoding === 'text')   return `"${frame.payload}"`;
    if (frame.payloadEncoding === 'binary') return `Uint8Array(${(frame.payload as Uint8Array).byteLength} bytes)`;
    return JSON.stringify(frame.payload, null, 2);
  })();

  const flagBits = [7, 6, 5, 4, 3, 2, 1, 0].map(b => ({
    bit: b,
    set: (frame.flags & (1 << b)) !== 0,
  }));

  return (
    <div className="space-y-0.5">
      <FieldRow name="type"     value={`${typeName} (${frame.type})`} />
      <FieldRow name="flags"    value={`0b${frame.flags.toString(2).padStart(8, '0')}`} mono />
      <FieldRow name="encoding" value={ENCODING_LABELS[frame.payloadEncoding] ?? frame.payloadEncoding} />
      {frame.timestamp !== undefined && (
        <FieldRow name="timestamp" value={new Date(frame.timestamp).toISOString()} />
      )}
      {frame.sequence !== undefined && (
        <FieldRow name="sequence" value={String(frame.sequence)} />
      )}
      {frame.metadata !== undefined && (
        <FieldRow name="metadata" value={JSON.stringify(frame.metadata)} mono />
      )}
      <FieldRow name="payload"    value={payloadStr} mono />
      <FieldRow name="rawPayload" value={`Uint8Array(${frame.rawPayload.byteLength})`} />
      <div className="pt-2">
        <div className="text-xs text-slate-500 mb-1">Flags breakdown</div>
        <div className="flex gap-1 font-mono text-xs">
          {flagBits.map(({ bit, set }) => (
            <span key={bit} className={set ? 'text-purple-400' : 'text-slate-700'}>{set ? '1' : '0'}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Size comparison table ────────────────────────────────────────────────────

const SIZE_PRESETS = [
  { label: 'PING (no payload)',  lib: serializeFrame({ type: FrameType.PING, timestamp: Date.now() }).byteLength, jsonPayload: null },
  { label: 'Short text',         lib: serializeFrame({ type: FrameType.MESSAGE, payload: 'hello world' }).byteLength, jsonPayload: 'hello world' },
  { label: 'JSON object',        lib: serializeFrame({ type: FrameType.MESSAGE, payload: { userId: 'abc123', action: 'join' } }).byteLength, jsonPayload: { userId: 'abc123', action: 'join' } },
  { label: 'Binary 256 B',       lib: serializeFrame({ type: FrameType.MESSAGE, payload: new Uint8Array(256) }).byteLength, jsonPayload: Array(256).fill(0) },
];

function SizeTable({ liveLib, liveJson, liveLabel }: { liveLib?: number; liveJson?: number; liveLabel?: string }) {
  const rows = SIZE_PRESETS.map(p => ({
    label: p.label,
    lib: p.lib,
    json: jsonSize(p.jsonPayload),
  }));

  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-slate-500 border-b border-slate-800">
          <th className="text-left pb-2 font-semibold">Payload</th>
          <th className="text-right pb-2 font-semibold">framepack</th>
          <th className="text-right pb-2 font-semibold">JSON text</th>
          <th className="text-right pb-2 font-semibold text-green-500">Saving</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => {
          const pct = (((r.json - r.lib) / r.json) * 100).toFixed(0);
          return (
            <tr key={r.label} className="border-b border-slate-800/50">
              <td className="py-1.5 text-slate-400">{r.label}</td>
              <td className="py-1.5 text-right font-mono text-sky-400">{r.lib} B</td>
              <td className="py-1.5 text-right font-mono text-slate-500">{r.json} B</td>
              <td className="py-1.5 text-right text-green-400 font-semibold">{pct}%</td>
            </tr>
          );
        })}
        {liveLib !== undefined && liveJson !== undefined && (
          <tr className="bg-slate-800/30">
            <td className="py-1.5 text-white font-semibold">↑ {liveLabel ?? 'Current'}</td>
            <td className="py-1.5 text-right font-mono text-sky-400 font-semibold">{liveLib} B</td>
            <td className="py-1.5 text-right font-mono text-slate-500">{liveJson} B</td>
            <td className="py-1.5 text-right text-green-400 font-semibold">
              {(((liveJson - liveLib) / liveJson) * 100).toFixed(0)}%
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function FramepackDemo() {
  const [opts, setOpts] = useState<FrameOptions>({
    frameType:    FrameType.MESSAGE,
    payloadKind:  'text',
    payloadText:  'hello world',
    withTimestamp: true,
    withSequence:  false,
    sequenceNum:   1,
    withMetadata:  false,
    metadataText:  '{"room":"lobby"}',
  });

  const patch = (p: Partial<FrameOptions>) => setOpts(o => ({ ...o, ...p }));

  const { encoded, decoded, error } = useMemo(() => {
    try {
      const payload = buildPayload(opts.payloadKind, opts.payloadText);
      const metadata = opts.withMetadata ? parseMetadata(opts.metadataText) : undefined;
      const input: FrameInput = {
        type: opts.frameType,
        payload: payload as FrameInput['payload'],
        ...(opts.withTimestamp ? { timestamp: 1_700_000_000_000 } : {}),
        ...(opts.withSequence  ? { sequence: opts.sequenceNum }    : {}),
        ...(metadata           ? { metadata }                      : {}),
      };
      const bytes   = serializeFrame(input);
      const decoded = deserializeFrame(bytes.buffer as ArrayBuffer);
      return { encoded: bytes, decoded, error: null };
    } catch (e) {
      return { encoded: null, decoded: null, error: String(e) };
    }
  }, [opts]);

  const liveJsonSize = useMemo(() => {
    const payload = buildPayload(opts.payloadKind, opts.payloadText);
    const jsonPayload = payload instanceof Uint8Array ? Array.from(payload) : payload;
    return jsonSize(jsonPayload);
  }, [opts]);

  return (
    <Layout>
      <section className="min-h-screen py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-10 animate-slide-up">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">⚡</span>
              <h1 className="text-4xl font-bold text-white">
                frame<span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">pack</span>
              </h1>
            </div>
            <p className="text-slate-400 max-w-2xl text-sm leading-relaxed mb-4">
              Binary WebSocket framing library. Custom 2-byte header (type + flags), MessagePack for JSON,
              UTF-8 for text, zero-copy pass-through for binary data. ESM-only, peer-dep on msgpack.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/dhruv0321/framepack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink size={14} /> GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/framepack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                <ExternalLink size={14} /> npm
              </a>
            </div>
          </div>

          {/* Frame layout diagram */}
          <div className="mb-8 p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto">
            <div className="text-slate-500 mb-2">Wire frame layout</div>
            <div className="flex gap-0 text-center min-w-max">
              {[
                { label: 'type',       sub: 'uint8',             w: 'w-16', color: 'bg-purple-900/60 border-purple-700 text-purple-300' },
                { label: 'flags',      sub: 'uint8',             w: 'w-16', color: 'bg-purple-900/60 border-purple-700 text-purple-300' },
                { label: 'timestamp?', sub: 'float64 BE',        w: 'w-24', color: 'bg-amber-900/40 border-amber-700 text-amber-300' },
                { label: 'sequence?',  sub: 'uint32 BE',         w: 'w-20', color: 'bg-amber-900/40 border-amber-700 text-amber-300' },
                { label: 'meta len?',  sub: 'uint16',            w: 'w-20', color: 'bg-amber-900/40 border-amber-700 text-amber-300' },
                { label: 'metadata?',  sub: 'msgpack map',       w: 'w-24', color: 'bg-amber-900/40 border-amber-700 text-amber-300' },
                { label: 'payload',    sub: 'binary/text/msgpack', w: 'w-36', color: 'bg-sky-900/40 border-sky-700 text-sky-300' },
              ].map(f => (
                <div key={f.label} className={`${f.w} border ${f.color} px-1 py-1.5`}>
                  <div className="font-semibold">{f.label}</div>
                  <div className="text-slate-500 text-[10px]">{f.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-2 gap-6 items-start">

            {/* Left column: builder */}
            <div className="space-y-5">
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Frame Builder</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Frame type</label>
                    <select
                      value={opts.frameType}
                      onChange={e => patch({ frameType: parseInt(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-sm px-3 py-2 outline-none focus:border-sky-500"
                    >
                      {FRAME_TYPES.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Payload encoding</label>
                    <div className="grid grid-cols-4 gap-1">
                      {(['none', 'text', 'json', 'binary'] as PayloadKind[]).map(k => (
                        <button
                          key={k}
                          onClick={() => patch({ payloadKind: k, payloadText: k === 'binary' ? '16' : k === 'json' ? '{"msg":"hello"}' : 'hello world' })}
                          className={`py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            opts.payloadKind === k
                              ? 'bg-sky-600 text-white'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>
                  </div>

                  {opts.payloadKind !== 'none' && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">
                        {opts.payloadKind === 'binary' ? 'Byte count (max 128)' : 'Payload'}
                      </label>
                      <textarea
                        value={opts.payloadText}
                        onChange={e => patch({ payloadText: e.target.value })}
                        rows={opts.payloadKind === 'json' ? 3 : 1}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-sm px-3 py-2 font-mono outline-none focus:border-sky-500 resize-none"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-6 pt-1">
                    {[
                      { key: 'withTimestamp', label: 'timestamp (+8 B)' },
                      { key: 'withSequence',  label: 'sequence (+4 B)' },
                      { key: 'withMetadata',  label: 'metadata' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={opts[key as keyof FrameOptions] as boolean}
                          onChange={e => patch({ [key]: e.target.checked })}
                          className="accent-sky-500"
                        />
                        <span className="text-xs text-slate-400">{label}</span>
                      </label>
                    ))}
                  </div>

                  {opts.withSequence && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Sequence number</label>
                      <input
                        type="number"
                        value={opts.sequenceNum}
                        onChange={e => patch({ sequenceNum: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg text-slate-200 text-sm px-3 py-2 outline-none focus:border-sky-500"
                      />
                    </div>
                  )}

                  {opts.withMetadata && (
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">
                        Metadata <span className="text-slate-600">(JSON object — msgpack encoded)</span>
                      </label>
                      <textarea
                        value={opts.metadataText}
                        onChange={e => patch({ metadataText: e.target.value })}
                        rows={2}
                        className={`w-full bg-slate-950 border rounded-lg text-slate-200 text-sm px-3 py-2 font-mono outline-none focus:border-sky-500 resize-none ${
                          parseMetadata(opts.metadataText) ? 'border-slate-700' : 'border-red-700'
                        }`}
                      />
                      {!parseMetadata(opts.metadataText) && (
                        <p className="text-xs text-red-400 mt-1">Invalid JSON</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Flags reference */}
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Flags byte reference</h2>
                <div className="space-y-1.5 font-mono text-xs">
                  {FLAGS_MAP.map(f => (
                    <div key={f.bit} className="flex gap-3">
                      <span className="text-amber-400 w-6">0x{f.bit.toString(16).toUpperCase()}</span>
                      <span className="text-slate-300 w-28">{f.label}</span>
                      <span className="text-slate-500">{f.desc}</span>
                    </div>
                  ))}
                  <div className="flex gap-3 mt-2 pt-2 border-t border-slate-800">
                    <span className="text-sky-400 w-6">0x{Flags.ENCODING_MASK.toString(16)}</span>
                    <span className="text-slate-300 w-28">ENCODING_MASK</span>
                    <span className="text-slate-500">bits 1-0: 00=binary 01=text 10=json 11=none</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column: output */}
            <div className="space-y-5 sticky top-[4.5rem]">
              {error ? (
                <div className="bg-red-950/40 border border-red-800 rounded-xl p-4 text-red-400 text-sm">{error}</div>
              ) : encoded && decoded ? (
                <>
                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                    <div className="flex items-baseline justify-between mb-3">
                      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Encoded bytes</h2>
                      <span className="text-xs font-mono text-sky-400">{encoded.byteLength} bytes</span>
                    </div>
                    <HexDisplay bytes={encoded} />
                  </div>

                  <div className="bg-slate-900 rounded-xl border border-slate-800 p-5">
                    <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Decoded frame</h2>
                    <DecodedPanel frame={decoded} />
                  </div>
                </>
              ) : null}
            </div>
          </div>

          {/* Size comparison — full width */}
          <div className="mt-6 bg-slate-900 rounded-xl border border-slate-800 p-5">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Size vs plain JSON/text</h2>
            <SizeTable
              liveLib={encoded?.byteLength}
              liveJson={liveJsonSize}
              liveLabel="Current frame"
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
