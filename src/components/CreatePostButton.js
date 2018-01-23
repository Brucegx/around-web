import React from 'react';
import { Modal, Button } from 'antd';
import { WrappedCreatePostForm } from '../components/CreateButtonForm';

export class CreatePostButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
      this.form.validateFields((err, values) => {
            if (!err) {
                console.log('here')
            }
      })

    //   this.setState({
    //   confirmLoading: true,
    // });
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   });
    // }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }
  
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Create New Post</Button>
        <Modal title="Create New Post"
            visible={visible}
            okText="Create"
            cancelText="Cancel"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
        >
          <WrappedCreatePostForm wrappedComponentRef={this.saveFormRef}/>
        </Modal>
      </div>
    );
  }
}
