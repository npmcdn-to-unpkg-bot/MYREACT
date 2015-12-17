var Loadding = React.createClass({
    propTypes: {
        width: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        height: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        color: React.PropTypes.string,
        active: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            color: '#00be9c',
            height: 30,
            width: 30,
            active: false
        };
    },

    getComponentStyle: function() {
        var width = this.props.width,
            height = this.props.height,
            color = this.props.color;
        /* 中间圆心 */
        var cWidth = 0.4 * width,
            cHeight = 0.4 * height,
            cMarginLeft = -0.5 * cWidth,
            cMarginTop = -0.5 * cHeight;

        /* 基本样式 */
        return {
            loaddingStyle: { // loadding 容器
                width: width,
                height: height
            },
            lineStyle: { // loadding 元件样式
                background: color
            },
            centerStyle: { // loadding 圆心样式
                width: cWidth,
                height: cHeight,
                marginLeft: cMarginLeft,
                marginTop: cMarginTop
            }
        };
    },

    renderBaseComp: function(compStyle) {
        /* 生成动画元件 */
        var n = 4; // 元件个数，todo: 定制个数
        var lines = []; // 元件元素集合
        for (var i = 0; i < n; i++) {
            lines.push(
                <div className="line">
                    <span className="top" style={ compStyle.lineStyle }></span>
                    <span className="bottom" style={ compStyle.lineStyle }></span>
                </div>
            );
        }
        return lines;
    },

    render: function() {
        /* 生成组件自己的样式 */
        var compStyle = this.getComponentStyle();
        /* 模拟渲染基本动画元件 */
        var lines = this.renderBaseComp(compStyle);

        // loadding 的class，控制交互
        var loaddingClasses = cx({
            loadding: true,
            active: this.props.active
        });

        return (
            <div className={ loaddingClasses } style={ compStyle.loaddingStyle }>
                {lines}
                <div className="loadding-center" style={ compStyle.centerStyle }></div>
            </div>

        );
    }

});
var cx = React.addons.classSet;

var loaddingClasses= cx({
    loading: true
});
//data var json
React.render(
    <Loadding width={30} height={30} className={loaddingClasses} />,
    document.getElementById('demo')
); 