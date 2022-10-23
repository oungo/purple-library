import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export interface IModalPortalProps {
  id: string;
  children: React.ReactNode;
}

export default function ModalPortal({ id, children }: IModalPortalProps) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById(id));
  }, [id]);

  if (!element) return null;

  return ReactDOM.createPortal(children, element);
}
