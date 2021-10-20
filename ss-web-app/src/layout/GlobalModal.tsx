import React, { useState } from 'react';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

import { Modal, Button } from 'antd';
import { globalModalState } from 'lib/atoms/globalModalAtom';
const GlobalModal = () => {
  const globalState = useRecoilValue(globalModalState);
  const setGlobalState = useSetRecoilState(globalModalState);

  const showModal = () => {
    setGlobalState({ isVisible: true });
  };

  const handleOk = () => {
    setGlobalState({ isVisible: false });
  };

  const handleCancel = () => {
    setGlobalState({ isVisible: false });
  };

  return (
    <>
      <Button type='primary' onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title='Basic Modal'
        visible={globalState.isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export { GlobalModal };
