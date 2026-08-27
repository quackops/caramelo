import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CopyField } from './copy-field';

const pix =
  '00020126580014BR.GOV.BCB.PIX0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540525.005802BR5913Lar Tintin6009SALVADOR62070503***6304A1B2';

const mockClipboard = (writeText: () => Promise<void>) => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  });
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CopyField', () => {
  it('renders the payload without truncating it', () => {
    render(<CopyField label="PIX copia e cola" value={pix} />);
    expect(screen.getByText(pix)).toBeInTheDocument();
  });

  it('writes the exact value to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    const onCopy = vi.fn();

    render(<CopyField value={pix} onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    await waitFor(() => expect(writeText).toHaveBeenCalledWith(pix));
    expect(onCopy).toHaveBeenCalledWith(pix);
  });

  it('confirms the copy visibly and out loud', async () => {
    mockClipboard(vi.fn().mockResolvedValue(undefined));
    const { container } = render(<CopyField value={pix} />);

    fireEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    await screen.findByRole('button', { name: /Copiado/ });
    expect(container.querySelector('[aria-live="polite"]')).toHaveTextContent(
      'Copiado',
    );
  });

  it('makes a failure visible instead of swallowing it', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')));
    render(<CopyField value={pix} />);

    fireEvent.click(screen.getByRole('button', { name: 'Copiar' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Não foi possível copiar',
    );
  });

  it('keeps the clipboard value exact while showing a formatted message', () => {
    render(
      <CopyField
        variant="text"
        value="Oi! Tenho interesse na Nina."
        display={<strong>Oi! Tenho interesse na Nina.</strong>}
        copyLabel="Copiar mensagem"
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Copiar mensagem' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Oi! Tenho interesse na Nina.').tagName).toBe(
      'STRONG',
    );
  });

  it('renders the inline reference with an icon action', () => {
    render(<CopyField variant="inline" value="erro 500 · ref 8F2A-D19" />);

    expect(screen.getByText('erro 500 · ref 8F2A-D19')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Copiar' })).toBeInTheDocument();
  });

  it('wraps the payload at any point rather than clipping it', () => {
    const { container } = render(<CopyField value={pix} />);
    expect(
      container.querySelector('.\\[overflow-wrap\\:anywhere\\]'),
    ).toBeTruthy();
  });
});
