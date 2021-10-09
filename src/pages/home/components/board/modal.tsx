import React from 'react';
import ReactDOM from 'react-dom';

export default class Modal extends React.PureComponent<React.HTMLAttributes<HTMLDivElement>> {
  root: HTMLDivElement;

  constructor(props) {
    super(props);
    const root = document.createElement('div');
    root.setAttribute('class', 'modal');
    root.style.position = 'absolute';
    root.style.top = '0';
    root.style.left = '0';
    root.style.width = '100%';

    this.root = root;
  }

  componentDidMount() {
    document.body.appendChild(this.root);
  }

  componentWillUnmount() {
    document.body.removeChild(this.root);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.root);
  }
}
