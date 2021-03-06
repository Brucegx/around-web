import React from "react";
import { Modal, Button, message } from "antd";
import { WrappedCreatePostForm } from "../components/CreatePostForm";
import $ from "jquery";
import { API_ROOT, POS_KEY, TOKEN_KEY, AUTH_PREFIX } from "../constants";

export class CreatePostButton extends React.Component {
  state = {
    visible: false,
    confirmLoading: false
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    const form = this.form.getWrapperForm();
    form.validateFields((err, values) => {
      if (err) {
          return;
      }

        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));
        const formData = new FormData();
        formData.set("lat", lat + Math.random() * 0.01 - 0.005);
        formData.set("lon", lon + Math.random() * 0.01 - 0.005);
        formData.set("message", form.getFieldValue("message"));
        formData.set("image", form.getFieldValue("image")[0]);

        this.setState({ confirmLoading: true });
        $.ajax({
       method: 'POST',
       url: `${API_ROOT}/post`,
       headers: {
         Authorization: `${AUTH_PREFIX} ${localStorage.getItem(TOKEN_KEY)}`,
       },
       processData: false,
       contentType: false,
       dataType: 'text',
       data: formData,
     }).then(() => {
       message.success('created a post successfully.');
        form.resetFields();
     },(error) => {
       message.error(error.responseText);
        form.resetFields();
     }).then(() => {
       this.props.loadNearbyPosts().then(() => {
           this.setState({ visible: false, confirmLoading: false });
       });
     }).catch((e) => {
       message.error('create post failed.');
       console.error(e);
     });
   });
  }
  handleCancel = () => {
    console.log("Clicked cancel button");
    this.setState({
      visible: false
    });
  };

  saveFormRef = form => {
    this.form = form;
  };

  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create New Post
        </Button>
        <Modal
          title="Create New Post"
          visible={visible}
          okText="Create"
          cancelText="Cancel"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <WrappedCreatePostForm wrappedComponentRef={this.saveFormRef} />
        </Modal>
      </div>
    );
  }
}
