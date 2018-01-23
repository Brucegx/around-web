import React from 'react';
import { Form, Input} from 'antd';
const FormItem = Form.Item;

class createButtonForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form layout="vertical">
          <FormItem
            {...formItemLayout}
            label="Message"
          >
            {getFieldDecorator('message', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
        );
     }    
}
export const WrappedCreatePostForm = Form.create()(createButtonForm);
