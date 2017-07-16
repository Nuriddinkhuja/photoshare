import React, { Component } from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// import { incrementLikes } from 'redux/modules/posts';

@connect(
  state => ({
    user: state.auth.user
  }),
  {}
)
export default class ListPost extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    editable: PropTypes.bool,
    gotoEdit: PropTypes.func,
    user: PropTypes.object,
    // incrementLikes: PropTypes.func.isRequired
  }

  static defaultProps = {
    user: null,
    editable: false,
    gotoEdit: () => {}
  };

  state = {
    items: []
  }

  render() {
    const { items, editable } = this.props;
    const styles = require('./Posts.scss');
    return (
      <div>
        <div className={styles.masonry}>
          {items.map(item => (
            <div className={styles['mas-item']} key={item.id}>
              <Card>
                <Card.Content>
                  <div className="right floated meta">{moment(item.createdAt, 'YYYY-MM-DD').fromNow()}</div>
                  {
                    editable ?
                      <Link onClick={() => this.props.gotoEdit(item.id)}>
                        <Icon name="write" />
                      </Link> :
                      ''
                  }
                  <Image
                    className="avatar"
                    src={item.users[0].avatar_path ? `/uploads/${item.users[0].avatar_path}` : ''}
                  />
                  {item.users[0].firstName}
                </Card.Content>
                <Link to={`/posts/${item.id}/`}>
                  <Image src={`/uploads/${item.img_path}`} />
                </Link>
                <Card.Content>
                  <Icon name="unhide" />
                  {item.views}
                </Card.Content>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
