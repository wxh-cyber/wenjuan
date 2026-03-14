import { FC, useRef } from "react";
import { Button, Space, Typography, Input, Tooltip, message, Popover } from "antd";
import type { InputRef } from "antd";
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from 'react-router-dom';
import useGetPageInfo from "../../../hooks/useGetPageInfo";
import { QRCodeSVG } from 'qrcode.react';
import styles from './StatHeader.module.scss';

const { Title } = Typography;

const StatHeader: FC = () => {
    const nav = useNavigate();
    const { id } = useParams();

    const { title, isPublished } = useGetPageInfo();

    //拷贝链接
    const urlInputRef = useRef<InputRef>(null);
    function copy() {
        //拷贝
        const elem = urlInputRef.current;
        if (elem == null) return;
        elem.select();          //选中输入框内容
        document.execCommand('copy');     //执行拷贝命令（富文本编辑器的操作）
        message.success('拷贝成功');
    }

    function genLinkAndQRCode() {
        if (!isPublished) return null;

        //拼接url，需要参考C端的规则
        const url = `http://localhost:3000/question/${id}`;

        //定义二维码组件
        const QRCodeElem = (
            <div style={{ textAlign: 'center' }}>
                <QRCodeSVG value={url} size={150} />
            </div>
        );

        return (
            <Space>
                <Input value={url} style={{ width: '300px' }} ref={urlInputRef} />
                <Tooltip title="拷贝链接">
                    <Button icon={<CopyOutlined />} onClick={copy} />
                </Tooltip>
                <Popover content={QRCodeElem}>
                    <Button icon={<QrcodeOutlined />} />
                </Popover>
            </Space>
        )
    }

    return (
        <div className={styles['header-wrapper']}>
            <div className={styles.header}>
                <div className={styles.left}>
                    <Space>
                        <Button
                            type="link"
                            icon={<LeftOutlined />}
                            onClick={() => nav(-1)}>
                            返回
                        </Button>
                        <Title>{title}</Title>
                    </Space>
                </div>
                <div className={styles.main}>
                    {genLinkAndQRCode()}
                </div>
                <div className={styles.right}>
                    <Button
                        type="primary"
                        onClick={() => nav(`/question/edit/${id}`)}>编辑问卷</Button>
                </div>
            </div>
        </div>
    )
}

export default StatHeader;