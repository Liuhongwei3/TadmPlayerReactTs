import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Radio, Spin } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import StyledItem from "../../components/detail/StyledItem";
import StyledWrapper from "../../components/detail/StyledWrapper";
import { countFormat, dateFormat, toTop } from "../../utils";
import { Artist, ESingerType, List } from "./type";
import req from "../../api/req";
import LoadingImg from "../../components/LoadingImg";
import StyledName from "../../components/detail/StyledName";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledDivider from "../../components/StyledDivider";

const TopSinger: React.FunctionComponent = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [type, setType] = React.useState<number>(ESingerType.CHINESE);
    const [singers, setSingers] = React.useState<List>();

    const getTopSingers = React.useCallback(async () => {
        setLoading(true);
        const data = await req.netease.topSinger(type);
        setSingers(data.list);
        setLoading(false);
    }, [type]);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getTopSingers();
    }, [getTopSingers]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/singer/${id}`);
            // updateCurMenu();
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            <div>
                <span>地区：</span>
                <Radio.Group
                    buttonStyle="solid"
                    defaultValue={ESingerType.CHINESE}
                    onChange={(e) => setType(e.target.value)}
                >
                    <Radio.Button value={ESingerType.CHINESE}>
                        华语
                    </Radio.Button>
                    <Radio.Button value={ESingerType.ENGLISH}>
                        欧美
                    </Radio.Button>
                    <Radio.Button value={ESingerType.KOREAN}>韩国</Radio.Button>
                    <Radio.Button value={ESingerType.JAPANESE}>
                        日本
                    </Radio.Button>
                </Radio.Group>

                <span style={{ float: "right", marginRight: 10 }}>
                    更新时间：{dateFormat(singers?.updateTime)}
                </span>
            </div>

            <StyledDivider />

            {singers?.artists && singers?.artists.length ? (
                <StyledWrapper>
                    {singers.artists.map((item: Artist) => {
                        return (
                            <StyledItem
                                key={item.id}
                                onClick={() => toDetail(item.id)}
                            >
                                <div
                                    style={{
                                        width: 150,
                                        height: 150,
                                        position: "relative",
                                    }}
                                >
                                    <LazyLoad
                                        height={100}
                                        placeholder={<LoadingImg />}
                                    >
                                        <img
                                            style={{ opacity: 0.7 }}
                                            width={150}
                                            height={150}
                                            alt="detail-cover"
                                            src={item.picUrl}
                                        />
                                    </LazyLoad>
                                    <StyledCount>
                                        <CustomerServiceOutlined
                                            style={{ marginRight: 5 }}
                                        />
                                        {countFormat(item.musicSize)}
                                    </StyledCount>
                                    <StyledDesc width={150}>
                                        热度：{item.score}
                                    </StyledDesc>
                                </div>

                                <StyledName width={150}>{item.name}</StyledName>
                            </StyledItem>
                        );
                    })}
                </StyledWrapper>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default TopSinger;
