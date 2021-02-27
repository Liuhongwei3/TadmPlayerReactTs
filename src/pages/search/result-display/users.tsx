import React from "react";
import LazyLoad from "react-lazyload";
import { Empty } from "antd";

import StyledCount from "../../../components/detail/StyledCount";
import StyledDesc from "../../../components/detail/StyledDesc";
import StyledItem from "../../../components/detail/StyledItem";
import StyledName from "../../../components/detail/StyledName";
import StyledWrapper from "../../../components/detail/StyledWrapper";
import LoadingImg from "../../../components/LoadingImg";
import { DEFAULT_IMG_WIDTH, DEFAULT_IMG_HEIGHT } from "../../../defaultConfig";
import { ISearchs } from "../type";
import { useHistory } from "react-router-dom";
import UserSex from "../../user/user-sex";

interface IProps {
    result: ISearchs | undefined;
}

const Users: React.FC<IProps> = (props: IProps) => {
    const { result } = props;
    const history = useHistory();

    const toDetail = React.useCallback(
        (id: number) => {
            history.push(`/user/${id}`);
        },
        [history]
    );

    return result && result.userprofiles && result.userprofiles.length ? (
        <>
            <StyledWrapper>
                {result.userprofiles.map((item) => {
                    return (
                        <StyledItem
                            key={item.userId}
                            onClick={() => toDetail(item.userId)}
                        >
                            <div
                                style={{
                                    width: DEFAULT_IMG_WIDTH,
                                    height: DEFAULT_IMG_HEIGHT,
                                    position: "relative",
                                }}
                            >
                                <LazyLoad
                                    height={DEFAULT_IMG_HEIGHT}
                                    placeholder={<LoadingImg />}
                                >
                                    <img
                                        style={{ opacity: 0.8 }}
                                        width={DEFAULT_IMG_WIDTH}
                                        height={DEFAULT_IMG_HEIGHT}
                                        alt="mv-cover"
                                        src={item.avatarUrl}
                                    />
                                </LazyLoad>
                                <StyledCount>
                                    <UserSex gender={item.gender} />
                                </StyledCount>
                                <StyledDesc width={DEFAULT_IMG_WIDTH}>
                                    {`${item.signature}`}
                                </StyledDesc>
                            </div>

                            <StyledName width={DEFAULT_IMG_WIDTH}>
                                {item.nickname}
                            </StyledName>
                        </StyledItem>
                    );
                })}
            </StyledWrapper>
        </>
    ) : (
        <Empty />
    );
};

export default Users;
