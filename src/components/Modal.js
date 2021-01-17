import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";

export default class BasicModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
 
  render() {
    const { open } = this.state;
    return (
        
      <div>
        
        <Button onClick={this.toggle}>Click Me!</Button>
        <Modal size="lg" centered="true" animation="true" open={open} toggle={this.toggle}>
          <ModalHeader><div >You've reached the max number of nominations</div></ModalHeader>
          <ModalBody> yeah </ModalBody>
        </Modal>
        
      </div>
    );
  }
}
