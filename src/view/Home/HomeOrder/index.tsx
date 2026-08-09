import {useState} from 'react';
import {useStores} from '@/store';
import {Button} from '@/components';
import {PhoneIcon, ChatsIcon, KeyboardIcon, CreditCardIcon, LinuxLogoIcon} from '@phosphor-icons/react';
import greyImg from '../../../assets/images/keyboard/陨石灰.jpg';
import pinkImg from '../../../assets/images/keyboard/粉.jpg';
import yamaImg from '../../../assets/images/keyboard/亚麻.jpg';
import yinImg from '../../../assets/images/keyboard/阳极银.jpg';
import maiImg from '../../../assets/images/keyboard/麦旋风.jpg';
import yelloImg from '../../../assets/images/keyboard/黄.jpg';
import greenImg from '../../../assets/images/keyboard/绿.jpg';
import blueImg from '../../../assets/images/keyboard/蓝.jpg';
import redImg from '../../../assets/images/keyboard/红.jpg';
import whiteImg from '../../../assets/images/keyboard/闪白.jpg';
import {observer} from 'mobx-react-lite';
import './index.less';

const HomeOrder = () => {
    const {globalStore} = useStores();
    const {loading, orderData, getPostOrder} = globalStore;

    const [formData, setFormData] = useState({
        item: 'navi',
        order: '',
        qq: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // 查询
    const handleClick = () => {
        getPostOrder(formData);
    };
    const keyListImg: any = {
        阳极银: yinImg,
        麦旋风: maiImg,
        陨石灰: greyImg,
        葵花黄: yelloImg,
        亚麻: yamaImg,
        闪白: whiteImg,
        闪红: redImg,
        浅蓝: blueImg,
        浅粉: pinkImg,
        浅绿: greenImg
    };

    const matchImg = (name: string) => {
        const replaceName = name.replace(/\n/g, '');
        const newNameThree = replaceName.slice(0, 3);
        const newNameTwo = replaceName.slice(0, 2);
        if (['阳极银', '陨石灰', '麦旋风', '葵花黄'].includes(newNameThree)) {
            return keyListImg[newNameThree];
        }
        if (['亚麻', '闪白', '闪红', '浅蓝', '浅绿', '浅粉'].includes(newNameTwo)) {
            return keyListImg[newNameTwo];
        }
        return yinImg;
    };

    return (
        <div className='home-order-wrap'>
            <div className='home-order home-order-bg'>
                <span className='order-title'>订单查询 Matrix Navi</span>
                <div className='search-wrap'>
                    <span style={{marginRight: '5px'}}>
                        <CreditCardIcon size={30} weight='duotone' />
                    </span>
                    <input
                        className='input'
                        type='text'
                        name='order'
                        value={formData.order}
                        onChange={handleChange}
                        placeholder='输入支付宝订单号'
                    />
                    <span style={{marginRight: '5px', marginLeft: '10px'}}>
                        <LinuxLogoIcon size={30} weight='duotone' />
                    </span>
                    <input
                        className='input'
                        type='text'
                        name='qq'
                        value={formData.qq}
                        onChange={handleChange}
                        placeholder='输入QQ'
                    />
                    <Button className='search-btn' onClick={handleClick}>
                        查询
                    </Button>
                </div>
                {!loading && orderData?.length > 0 && (
                    <div className='order-list-root'>
                        <div className='order-list-info'>
                            <div className='order-title-info'>
                                <ChatsIcon size={26} weight='duotone' />
                                <span style={{marginLeft: '10px'}}>{orderData[0]?.qq}</span>
                            </div>
                            <div className='order-title-info'>
                                <PhoneIcon size={26} weight='duotone' />
                                <span style={{marginLeft: '10px'}}>{orderData[0]?.phone}</span>
                            </div>
                            <div className='order-title-info'>
                                <KeyboardIcon size={26} weight='duotone' />
                                <span style={{marginLeft: '10px'}}>数量: {orderData[0]?.ver?.length ?? 0}个</span>
                            </div>
                        </div>
                        {orderData.map((item) => (
                            <div key={item.qq} className='order-item-wrap'>
                                {(item.ver ?? []).map((verItem: string) => (
                                    <div key={verItem} className='order-item'>
                                        <img alt='' className='img' src={matchImg(verItem)} />
                                        <div>{verItem}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default observer(HomeOrder);
