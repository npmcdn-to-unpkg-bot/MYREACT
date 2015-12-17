/**
 * 喜欢按钮
 * @return {[type]}  [description]
 */
var LikeButton = React.createClass({
    getInitialState: function() {
        return {liked: false};
    },
    // 事件处理
    handleClick: function(event) {
        this.setState({liked: !this.state.liked});
    },
    render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
    }
});
/**
 * 个人头像
 * @return {[type]}   [description]
 */
var Avatar = React.createClass({
    render: function() {
        return (
          <div>
            <ProfilePic username={this.props.username} />
            <ProfileLink username={this.props.username} />
          </div>
        );
    }
});

var ProfilePic = React.createClass({
    render: function() {
        return (
          <img src={'http://fakeimg.pl/100x100/' + this.props.username + '/'} />
        );
    }
});

var ProfileLink = React.createClass({
    render: function() {
        return (
          <a href={'http://fakeimg.pl/100x100/' + this.props.username}>
            {this.props.username}
          </a>
        );
    }
});
/**
 * 定时器
 * @type {Object}
 */
var SetIntervalMixin = {
    componentWillMount: function() {
        this.intervals = [];
    },
    setInterval: function() {
        this.intervals.push(setInterval.apply(null, arguments));
    },
    // 当不需要它的时候取消定时器来节省内存是非常重要
    componentWillUnmount: function() {
        this.intervals.map(clearInterval);
    }
};
var TickTock = React.createClass({
    mixins: [SetIntervalMixin], // 引用 mixin
    getInitialState: function() {
        return {seconds: 0};
    },
    componentDidMount: function() {
        this.setInterval(this.tick, 1000); // 调用 mixin 的方法
    },
    tick: function() {
        this.setState({seconds: this.state.seconds + 1});
    },
    render: function() {
    return (
      <p>
        React has been running for {this.state.seconds} seconds.
      </p>
    );
    }
});
/**
 * 多选框
 * @return {[type]}          [description]
 */
var FancyCheckbox = React.createClass({
    getInitialState:function (){
        return {checked : false};
    },
    handelClick: function (){
        this.setState({checked : !this.state.checked });
        console.log.bind(console);
    },
    render: function() {
        var title = '这是一个单选框';
        //class
        var fancyClass = this.state.checked ? 'FancyChecked' : 'FancyUnChecked';
        var fancyTitle = this.state.checked ? 'X ' + title : 'O ' + title;
        return (
          <label>
            <input checked={this.state.checked} className={fancyClass} type="checkbox" onClick={this.handelClick}/>
                {fancyTitle}
          </label>
        );
    }
});
/**
 * input
 */
var InputGroup = React.createClass({
    getInitialState: function() {
        return {value: 'Hello!'};
    },
    handelChange: function () {
        this.setState({value: event.target.value.substr(0,140)});
    },
    render: function () {
        var value = this.state.value;
        // 这是一个受限的组件，所以需要监听change事件
        // value 一旦设置就不能再改了，但是使用state变量就可更改
        return <input type="text" value={value} onChange={this.handelChange} />;
    }
});
/**
 * 非受限的组件
 * @return {[type]}   [description]
 */
var InputDen = React.createClass({
    render: function() {
      return (
          <div>
            <input type="radio" name="opt" defaultChecked /> Option 1
            <input type="radio" name="opt" /> Option 2
            <select multiple={true} defaultValue={['B', 'C']}>
              <option value="A">Apple</option>
              <option value="B">Banana</option>
              <option value="C">Cranberry</option>
            </select>
          </div>
      );
    }
});
/**
 * 渲染层
 * @type {String}
 */
React.render(
    <Avatar username="ff0000"/>,
    $('#avatar')[0]
);

React.render(
    <LikeButton />,
    $('#button')[0]
);

React.render(
    <TickTock />,
    $('#clock')[0]
);

React.render(
    <FancyCheckbox>
        Hello World!
    </FancyCheckbox>,
    $('#check')[0]
);

React.render(
    <InputGroup />,
    $('#inputbox')[0]
);

React.render(
    <InputDen />,
    $('#inputden')[0]
);