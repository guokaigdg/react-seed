import './index.less';

interface CardProps {
    children?: React.ReactNode;
}

const Card = (props: CardProps) => {
    const {children} = props;
    return <div className='cp-card'>{children}</div>;
};

export default Card;
