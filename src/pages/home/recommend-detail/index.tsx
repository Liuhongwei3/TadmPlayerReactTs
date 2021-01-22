import React from "react";
import styled from "styled-components";

import req from "../../../api/req";
import { IRecomDetail } from "../types";

const StyledWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    font-size: 14px;
    color: #d9d9d9;
`;

const StyledItem = styled.div`
    flex: 1;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const RecommendDetail: React.FunctionComponent = () => {
    const [recomDetails, setRecomDetails] = React.useState<Array<IRecomDetail>>(
        []
    );

    const getRecomDetails = async () => {
        let data = await req.netease.getRecomDetails(14);
        setRecomDetails(data);
    };

    React.useEffect(() => {
        getRecomDetails();
    }, []);

    return (
        <div>
            <h2>推荐歌单</h2>
            <StyledWrapper>
                {recomDetails.map((item: IRecomDetail) => {
                    return (
                        <StyledItem key={item.id}>
                            <img
                                style={{ borderRadius: 10, margin: 6 }}
                                width={150}
                                height={150}
                                alt="detail-cover"
                                src={item.picUrl}
                            />
                            <div>{item.name}</div>
                        </StyledItem>
                    );
                })}
            </StyledWrapper>
        </div>
    );
};

export default RecommendDetail;
