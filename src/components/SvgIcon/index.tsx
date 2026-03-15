import React from 'react';
import './index.less';

interface SvgIconProps {
    svgName: string; // svg名字
    svgClass?: string; // 自定义类名
    color?: string; // 填充颜色
}

const SvgIcon = (props: SvgIconProps) => {
    const { svgName, color, svgClass } = props;

    // 修复：处理可选类名，避免 undefined 渲染到 DOM 中
    const className = ['svg-class'];
    if (svgClass) {
        className.push(svgClass);
    }

    return (
        <i aria-hidden="true">
            <svg className={className.join(' ')}>
                {/* React 19 中 推荐使用 href */}
                <use href={`#icon-${svgName}`} fill={color} />
            </svg>
        </i>
    );
};

export default SvgIcon;