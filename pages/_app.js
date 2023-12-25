import { ModalProvider } from '@/context/ModalContext';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  );
}
