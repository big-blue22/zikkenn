import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'ヘルシーバディ — あなたを守るダイエットアプリ',
  description:
    '記録するだけじゃない、あなたのダイエットを守ってくれるアプリ。ゲーミフィケーションで挫折を防ぎます。',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FF6B35" />
      </head>
      <body className="antialiased">
        <div className="app-container">
          <AppShell>
            {children}
          </AppShell>
        </div>
      </body>
    </html>
  );
}
