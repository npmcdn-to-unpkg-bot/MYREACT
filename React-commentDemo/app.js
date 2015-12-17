// comment box
var CommentBox = React.createClass({
    // inital state . only once
    getInitialState : function (){
        return {
            data:[]
        };
    },
    loadComments: function () {
        //ajax
        $.ajax({
            //require url
            url: this.props.url,
            dataType: 'json',
            //function callback
            success: function(data) {
                this.setState({data: data});//change state
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());//error
            }.bind(this)
        }); 
    },
    handleCommentSubmit: function (comment) {
        // concat comment
        var comments = this.state.data;
        var newComments = comments.concat([comment]);
        this.setState({data: newComments});
        //submit comment and refesh the list
        // console.log(comment.author);
        $.ajax({
            url:this.props.url,
            dataType:'json',
            type:'POST',
            data:comment,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(this.props.url, status, err.toString());
            }.bind(this)
        });
        // 这里产生了一个问题:json 数据并没有改变json文件，所以会立即重置
    },
    componentDidMount: function (){
        this.loadComments();
        //轮询 pollInterval : time for ajax
        setInterval(this.loadComments, this.props.pullInterval);
    },
    render: function() {
        return (
            <div className="commentBox">
            hello,commentBox.
            <CommentList data={this.state.data} />
            <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});
//comment list
var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
//comment form
var CommentForm = React.createClass({
    handleSubmit: function(e) {
        // 阻止事件冒泡
        e.preventDefault();
        // 利用ref给组件命名
        var author = this.refs.author.getDOMNode().value.trim();
        var text = this.refs.text.getDOMNode().value.trim();
        if (!text || !author) {
            return;
        }
        // TODO: send request to the server
        this.props.onCommentSubmit({author: author, text: text});
        this.refs.author.getDOMNode().value = '';
        this.refs.text.getDOMNode().value = '';
        return;
    },
  render: function() {
    return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Name" ref="author"/>
            <input type="text" placeholder="Say Something..." ref="text"/>
            <input type="submit" value="提交"/>
        </form>
    );
  }
});
var converter = new Showdown.converter();
//comment 
var Comment = React.createClass({
    render: function() {
        //任何内嵌元素作为children
        var rawMarkup = converter.makeHtml(this.props.children.toString());
        return (
            <div className="comment">
                <h2 className="authorName">
                {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html:rawMarkup}} />
            </div>
        );
    }
});

//data var json
React.render(
    <CommentBox url="./data.json" pullInterval={2000} />,
    document.getElementById('text')
);