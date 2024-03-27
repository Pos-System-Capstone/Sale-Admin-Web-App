import Page from 'components/Page';
import React, { useRef, useState } from 'react';

import { useNavigate } from 'react-router';

import StorePromotion from './StorePromotion';

export default function StorePromotionListPage() {
  const [activeTab, setActiveTab] = useState('1');
  const ref = useRef<any>();
  const navigate = useNavigate();

  return (
    <>
      <Page>
        <StorePromotion />
      </Page>
    </>
  );
}
