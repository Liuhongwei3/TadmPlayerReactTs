import React from "react";
import LazyLoad from "react-lazyload";
import { useHistory } from "react-router-dom";
import { Empty, Spin } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import req from "../../api/req";
import { ITopList } from "./type";
import StyledWrapper from "../../components/detail/StyledWrapper";
import StyledItem from "../../components/detail/StyledItem";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledName from "../../components/detail/StyledName";
import { countFormat, dateFormat, notify, toTop, updateCurMenu } from "../../utils";
import LoadingImg from "../../components/LoadingImg";

const TopDetail: React.FunctionComponent = () => {
    const history = useHistory();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [topLists, setTopLists] = React.useState<Array<ITopList>>([]);

    const getRecomDetails = React.useCallback(() => {
        setLoading(true);
        req.netease
            .toplist()
            .then((res) => {
                setTopLists(res.list);
            })
            .catch((e) =>
                notify(
                    "error",
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载歌单排行榜数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, []);

    React.useEffect(() => {
        toTop();
    }, []);

    React.useEffect(() => {
        getRecomDetails();
    }, [getRecomDetails]);

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/detail/${id}`);
            updateCurMenu();
        },
        [history]
    );

    return (
        <Spin tip="Loading..." spinning={loading}>
            {topLists.length ? (
                <StyledWrapper>
                    {topLists.map((item: ITopList) => {
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
                                            style={{ opacity: 0.65 }}
                                            width={150}
                                            height={150}
                                            alt="detail-cover"
                                            src={item.coverImgUrl}
                                        />
                                    </LazyLoad>
                                    <StyledCount>
                                        <CustomerServiceOutlined
                                            style={{ marginRight: 5 }}
                                        />
                                        {countFormat(item.playCount)}
                                    </StyledCount>
                                    <StyledDesc width={150}>
                                        {`${dateFormat(item.updateTime)} 更新`}
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

export default TopDetail;
