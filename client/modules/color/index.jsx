import React from 'react';
import { Card, Icon, Row, Col } from 'antd';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { createAction } from 'redux-actions';
import { connect } from 'react-redux';
import EventListener, {withOptions} from 'react-event-listener';

import Box from './components/Box';
import SpinLoader from './components/SpinLoader';

import style from './style.less';

class Color extends React.Component {
  constructor(props) {
    super(props);
    let me = this;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }
  onLikeClickHandler(index, btnStatus){
    let me = this;
    const ac = createAction('color/toggleLike');
    me.props.dispatch(ac({
      ...btnStatus,
      index
    }));
  }

  scrollHandler(ev) {
    let me = this;
    let isloading = me.props.color.get('loading');
    if(isloading){
      return false;
    }

    let elem = ev.target.scrollingElement;
    let scrollProgress = elem.scrollTop / (elem.scrollHeight - elem.clientHeight);
    if(scrollProgress > 0.96){
      let actcr = createAction('color/loadMore');
      me.props.dispatch(actcr());
    }
  };

  render() {
    let me = this;
    return <div>
      <EventListener
        target="window"
        onScroll={me.scrollHandler.bind(me)}
        />
      <QueueAnim type="top"
                 duration={350}
                 interval={90}
                 className={classnames(style.list)}>
        {
          me.props.color.get('list').map((v, k) => {
            return (<Col xs={12}
                         sm={12}
                         md={8}
                         lg={6}
                         key={k}
                         className={style.colContainer}>
              <Box boxInfo={v} onLikeClick={me.onLikeClickHandler.bind(me, k)} />
            </Col>);
          })
        }
      </QueueAnim>
      { me.props.color.get('loading') ? <SpinLoader /> : <div style={{height: 22, marginTop: 20}}/> }
    </div>
  }
}

function mapStateToProps({color}){
  return {
    color
  }
}

export default connect(mapStateToProps)(Color);
