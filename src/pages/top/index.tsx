import React from "react";
import { Spin } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";

import req from "../../api/req";
import { ITopList } from "./type";
import StyledWrapper from "../../components/detail/StyledWrapper";
import StyledItem from "../../components/detail/StyledItem";
import StyledCount from "../../components/detail/StyledCount";
import StyledDesc from "../../components/detail/StyledDesc";
import StyledName from "../../components/detail/StyledName";
import { countFormat, dateFormat } from "../../utils";

const Top: React.FunctionComponent = () => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [topLists, setTopLists] = React.useState<Array<ITopList>>([]);

    const getRecomDetails = () => {
        setLoading(true);
        req.netease
            .toplist()
            .then((res) => {
                setTopLists(res);
            })
            .finally(() => setLoading(false));
    };

    React.useEffect(() => {
        getRecomDetails();
    }, []);

    return (
        <Spin tip="Loading..." spinning={loading}>
            <StyledWrapper>
                {topLists.map((item: ITopList) => {
                    return (
                        <StyledItem key={item.id}>
                            <div
                                style={{
                                    width: 180,
                                    height: 180,
                                    position: "relative",
                                }}
                            >
                                <img
                                    style={{ opacity: 0.65 }}
                                    width={180}
                                    height={180}
                                    alt="detail-cover"
                                    src={item.coverImgUrl}
                                />
                                <StyledCount>
                                    <CustomerServiceOutlined
                                        style={{ marginRight: 5 }}
                                    />
                                    {countFormat(item.playCount)}
                                </StyledCount>
                                <StyledDesc width={180}>
                                    {`${dateFormat(item.updateTime)} 更新`}
                                </StyledDesc>
                            </div>

                            <StyledName width={180}>{item.name}</StyledName>
                        </StyledItem>
                    );
                })}
            </StyledWrapper>
        </Spin>
    );
};

export default Top;
