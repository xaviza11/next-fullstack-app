"use client";

import { SessionProvider } from "next-auth/react";
import {IntlProvider, FormattedMessage, FormattedNumber, useIntl} from 'react-intl'
import {es, en} from '@/locales/index'
import { Provider } from "react-redux";
import store from "../../store";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return <SessionProvider><Provider store={store}><IntlProvider locale="en" messages={en}>{children}</IntlProvider></Provider></SessionProvider>;
}
