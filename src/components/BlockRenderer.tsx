import { ArrowRight, Check } from 'lucide-react';
import type { Block } from '../content/lessons';

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return <h2 key={index} className="lesson-heading">{block.text}</h2>;
          case 'subheading':
            return <h3 key={index} className="lesson-subheading">{block.text}</h3>;
          case 'paragraph':
            return <p key={index} className="lesson-paragraph" dangerouslySetInnerHTML={{ __html: renderInline(block.text) }} />;
          case 'box':
            return (
              <div key={index} className={`concept-box ${block.variant}`}>
                <strong>{block.label}</strong>
                <p dangerouslySetInnerHTML={{ __html: renderInline(block.text) }} />
              </div>
            );
          case 'compare':
            return (
              <div key={index} className="compare-grid">
                {block.items.map((item, i) => (
                  <div key={i}>
                    <span>{item.label}</span>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                  </div>
                ))}
              </div>
            );
          case 'flow':
            return (
              <div key={index} className="flow-diagram">
                {block.steps.map((step, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
                    {step}
                    {i < block.steps.length - 1 && <ArrowRight size={16} />}
                  </span>
                ))}
              </div>
            );
          case 'list':
            return (
              <ul key={index} className="lesson-list">
                {block.items.map((item, i) => <li key={i} dangerouslySetInnerHTML={{ __html: renderInline(item) }} />)}
              </ul>
            );
          case 'checklist':
            return (
              <div key={index} className="mini-list">
                {block.items.map((item, i) => <span key={i}><Check size={15} /> {item}</span>)}
              </div>
            );
          case 'quote':
            return <div key={index} className="quote-box">{block.text}</div>;
          case 'table':
            return (
              <div key={index} className="lesson-table-wrapper">
                <table className="lesson-table">
                  <thead><tr>{block.headers.map((header, i) => <th key={i}>{header}</th>)}</tr></thead>
                  <tbody>
                    {block.rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}
                  </tbody>
                </table>
              </div>
            );
          case 'timeline':
            return (
              <div key={index} className="timeline">
                {block.items.map((item, i) => (
                  <div key={i} className="timeline-item">
                    <span className="timeline-year">{item.year}</span>
                    <span className="timeline-text">{item.text}</span>
                  </div>
                ))}
              </div>
            );
          case 'callout':
            return <div key={index} className="lesson-callout">{block.text}</div>;
          default:
            return null;
        }
      })}
    </>
  );
}

function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>');
}
