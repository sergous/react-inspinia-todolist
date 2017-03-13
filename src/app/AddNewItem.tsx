import * as React from 'react';

interface IAddNewItemProps {
  addNew: () => void;
  className?: string;
}

interface IAddNewItemState {
}

class AddNewItem extends React.Component<IAddNewItemProps, IAddNewItemState> {
  static propTypes = {
    addNew: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
  };

  constructor(props: any, context: any) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick() {
    this.props.addNew();
  }

  render() {
    const element = <button className='btn btn-huge' onClick={this.handleClick}>
                      <i className='fa fa-plus' title='Add new' />
                    </button>;

    return (
      <div className={this.props.className + ' text-center padding-l'}>
         {element}
       </div>
    );
  }
}

export default AddNewItem;
