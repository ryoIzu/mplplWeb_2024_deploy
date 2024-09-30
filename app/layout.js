'use client';
import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';
import './components/elements/accordion/accordion-custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { usePathname } from 'next/navigation';
import NavigationBar from './components/layouts/navigationBar/navigationBar';
import Footer from './components/layouts/footer/footer';
import { NewsContextProvider } from '@/features/hooks/newsContext/newsContext';
import { ProjectContextProvider } from '@/features/hooks/projectContext/projectContext';
import { WorksContextProvider } from '@/features/hooks/worksContext/worksContext';

const noto_jp = Noto_Sans_JP({
  weight: ['200', '700'],
  style: 'normal',
  subsets: ['latin'],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideFooterPages = ['/'];
  const shouldHideFooter = hideFooterPages.includes(pathname);

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={noto_jp.className}>
        <WorksContextProvider>
          <NewsContextProvider>
            <ProjectContextProvider>
              <NavigationBar />
              <div className="content-wrapper">{children}</div>
              {!shouldHideFooter && <Footer />}
            </ProjectContextProvider>
          </NewsContextProvider>
        </WorksContextProvider>
      </body>
    </html>
  );
}
