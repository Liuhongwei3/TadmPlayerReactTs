import React from "react";
import { Button, Empty, Popover, Spin } from "antd";
import {
    RightOutlined,
    GlobalOutlined,
    SmileOutlined,
    AppstoreOutlined,
    RadarChartOutlined,
    SkinOutlined,
    DownOutlined,
} from "@ant-design/icons";

import req from "../../api/req";
import { IHotDetailCats } from "./type";
import { notify } from "../../utils";
import StyledTag from "../../components/StyledTag";
import { EMessageType } from "../enums";

const INIT_LIMIT = 24;
const DEFAULT_CATS = {
    code: 200,
    all: { name: "全部歌单" },
    categories: {
        0: "语种",
        1: "风格",
        2: "场景",
        3: "情感",
        4: "主题",
    },
    sub: [
        {
            name: "流行",
            resourceCount: 943,
            type: 0,
            category: 1,
            resourceType: 0,
            hot: true,
            activity: false,
        },
    ],
};

interface IProps {
    curCat: string;
    setCurCat: (curCat: string) => void;
    setLimit: (limit: number) => void;
}

const HotDetailCats: React.FunctionComponent<IProps> = (props: IProps) => {
    const { curCat, setCurCat, setLimit } = props;
    const [visible, setVisible] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [hotDetailCats, setHotDetailCats] = React.useState<IHotDetailCats>(
        DEFAULT_CATS
    );

    const getHotDetailCats = React.useCallback(() => {
        setLoading(true);
        req.netease
            .hotDetailCats()
            .then((res) => {
                setHotDetailCats(res);
            })
            .catch((e) => {
                notify(EMessageType.ERROR, (e && e.message) || "获取热门歌单类目数据失败");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    React.useEffect(() => {
        getHotDetailCats();
    }, [getHotDetailCats]);

    const updateCurInfo = React.useCallback(
        (curCat: string) => {
            setLimit(INIT_LIMIT);
            setCurCat(curCat);
            setVisible(false);
        },
        [setCurCat, setLimit]
    );

    const PopContent = React.useCallback(() => {
        return (
            <>
                {Object.entries(hotDetailCats.categories).map((item, index) => (
                    <div key={item[0]} style={{ margin: "10px 0" }}>
                        <h3>
                            {index === 0 && <GlobalOutlined />}
                            {index === 1 && <RadarChartOutlined />}
                            {index === 2 && <SkinOutlined />}
                            {index === 3 && <SmileOutlined />}
                            {index === 4 && <AppstoreOutlined />}
                            {item[1]}
                        </h3>
                        <div>
                            {hotDetailCats.sub
                                .filter(
                                    (items) =>
                                        items.category === Number(item[0])
                                )
                                .map((cat) => (
                                    <StyledTag
                                        key={cat.name}
                                        color={
                                            curCat === cat.name
                                                ? "red"
                                                : "rgb(159 157 157)"
                                        }
                                        fontSize={13}
                                        onClick={() => updateCurInfo(cat.name)}
                                    >
                                        {cat.name}
                                    </StyledTag>
                                ))}
                        </div>
                    </div>
                ))}
            </>
        );
    }, [hotDetailCats, curCat, updateCurInfo]);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <div
                style={{
                    display: "inline-block",
                    padding: "24px 0 0 24px",
                }}
            >
                <span>热门歌单分类：</span>
                <Popover
                    placement="bottomLeft"
                    trigger="click"
                    color="#777"
                    overlayStyle={{
                        width: "66vw",
                        height: "66vh",
                        color: "white",
                        overflowY: "scroll",
                    }}
                    visible={visible}
                    title={
                        hotDetailCats ? (
                            <StyledTag
                                fontSize={13}
                                color={
                                    curCat === hotDetailCats.all.name
                                        ? "red"
                                        : "rgb(159 157 157)"
                                }
                                onClick={() =>
                                    updateCurInfo(hotDetailCats.all.name)
                                }
                            >
                                {hotDetailCats.all.name}
                            </StyledTag>
                        ) : (
                            <Empty />
                        )
                    }
                    content={hotDetailCats ? <PopContent /> : <Empty />}
                    onVisibleChange={(visible) => setVisible(visible)}
                >
                    <Button
                        type="ghost"
                        style={{ color: "pink" }}
                        icon={visible ? <DownOutlined /> : <RightOutlined />}
                        onClick={() => setVisible(true)}
                    >{`${curCat}`}</Button>
                </Popover>
            </div>
        </Spin>
    );
};

export default HotDetailCats;

// .ant-popover-arrow {
//     border-top-color: rgb(145, 144, 144) !important;
//     border-left-color: rgb(145, 144, 144) !important;
// }