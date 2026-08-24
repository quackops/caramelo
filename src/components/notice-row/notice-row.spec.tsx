import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NoticeRow } from './notice-row';

describe('NoticeRow', () => {
  it('renders the message and timestamp', () => {
    render(
      <NoticeRow
        message="Marina demonstrou interesse na Nina"
        timestamp="há 12 min"
      />,
    );

    expect(
      screen.getByText('Marina demonstrou interesse na Nina'),
    ).toBeInTheDocument();
    expect(screen.getByText('há 12 min')).toBeInTheDocument();
  });
});
