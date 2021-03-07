import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Button, Empty, Radio, Spin, Image } from "antd";
import { VideoCameraOutlined } from "@ant-design/icons";

import StyledItem from "../../components/detail/StyledItem";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, dateFormat, notify, toTop } from "../../utils";
import { Data, ITopMvRes } from "./type";
import req from "../../api/req";
import LoadingImg from "../../components/LoadingImg";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledDivider from "../../components/StyledDivider";
import {
    DEFAULT_MV_SMALL_HEIGHT,
    DEFAULT_MV_SMALL_WIDTH,
} from "../../web-config/defaultConfig";

const INIT_LIMIT = 18;
const Types = [
    { title: "内地" },
    { title: "港台" },
    { title: "欧美" },
    { title: "韩国" },
    { title: "日本" },
];

const TopMv: React.FunctionComponent = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [limit, setLimit] = React.useState<number>(INIT_LIMIT);
    const [type, setType] = React.useState<string>(Types[0].title);
    const [mvRes, setMvRes] = React.useState<ITopMvRes>();

    const getTopMvs = React.useCallback(() => {
        setLoading(true);
        req.netease
            .topMv(limit, type)
            .then((res) => {
                setMvRes(res);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载 MV 排行榜数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [limit, type]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getTopMvs();
    }, [getTopMvs]);

    const updateCurInfo = React.useCallback((type: string) => {
        setLimit(INIT_LIMIT);
        setType(type);
    }, []);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/mv/${id}`);
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <div style={{ padding: "0 20px" }}>
                <span>地区：</span>
                <Radio.Group
                    buttonStyle="solid"
                    defaultValue={"内地"}
                    onChange={(e) => updateCurInfo(e.target.value)}
                >
                    {Types.map((type) => (
                        <Radio.Button key={type.title} value={type.title}>
                            {type.title}
                        </Radio.Button>
                    ))}
                </Radio.Group>

                <span style={{ float: "right", marginRight: 10 }}>
                    更新时间：{dateFormat(mvRes?.updateTime)}
                </span>
            </div>

            <StyledDivider />

            {mvRes?.data && mvRes?.data.length ? (
                <React.Fragment>
                    <StyledWrapper>
                        {mvRes?.data.map((item: Data) => {
                            return (
                                <StyledItem
                                    key={item.id}
                                    onClick={() => toDetail(item.id)}
                                >
                                    <div
                                        style={{
                                            width: DEFAULT_MV_SMALL_WIDTH,
                                            height: DEFAULT_MV_SMALL_HEIGHT,
                                            position: "relative",
                                        }}
                                    >
                                        <LazyLoad
                                            height={DEFAULT_MV_SMALL_WIDTH}
                                            placeholder={<LoadingImg />}
                                        >
                                            <Image
                                                alt="mv-cover"
                                                loading="lazy"
                                                style={{ opacity: 0.8 }}
                                                preview={false}
                                                width={DEFAULT_MV_SMALL_WIDTH}
                                                height={DEFAULT_MV_SMALL_HEIGHT}
                                                src={item.cover}
                                                placeholder={<LoadingImg />}
                                            />
                                        </LazyLoad>
                                        <StyledCount>
                                            <VideoCameraOutlined />
                                            {countFormat(item.playCount)}
                                        </StyledCount>
                                        <StyledDesc
                                            width={DEFAULT_MV_SMALL_WIDTH}
                                        >
                                            热度：{item.score}
                                        </StyledDesc>
                                    </div>

                                    <StyledName width={DEFAULT_MV_SMALL_WIDTH}>
                                        {item.name}
                                    </StyledName>
                                </StyledItem>
                            );
                        })}
                    </StyledWrapper>
                    <Button
                        style={{ margin: "0 auto", display: "flex" }}
                        type="primary"
                        disabled={!mvRes.hasMore}
                        loading={loading}
                        onClick={() => setLimit(limit + 12)}
                    >
                        Loading More
                    </Button>
                </React.Fragment>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default TopMv;
