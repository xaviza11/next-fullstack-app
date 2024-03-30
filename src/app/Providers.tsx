"use client";
import {IntlProvider} from 'react-intl'
import {en} from '@/locales/index'
import { Provider } from "react-redux";
import store from "../../store";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return <Provider store={store}><IntlProvider locale="en" messages={en}>{children}</IntlProvider></Provider>
}
