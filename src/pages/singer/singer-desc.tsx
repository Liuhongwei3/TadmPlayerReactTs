import { Anchor, Empty, Spin, Typography } from "antd";
import React from "react";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { EMessageType } from "../enums";
import { Introduction, ISingerDesc } from "./type";

interface IProps {
    singerId: number;
}

const SingerDesc: React.FunctionComponent<IProps> = (props: IProps) => {
    const { singerId } = props;
    const [loading, setLoading] = React.useState<boolean>(false);
    const [descs, setDescs] = React.useState<ISingerDesc>();

    const getDesc = React.useCallback(() => {
        setLoading(true);
        reqs.netease
            .singerDesc(singerId)
            .then((res) => {
                setDescs(res);
            })
            .catch((e) =>
                notify(
                    EMessageType.ERROR,
                    (e.response && e.response.statusText) ||
                        e.message ||
                        "加载歌手描述数据失败"
                )
            )
            .finally(() => setLoading(false));
    }, [singerId]);

    React.useEffect(() => {
        getDesc();
    }, [getDesc]);

    const handleClick = React.useCallback(
        (
            e: React.MouseEvent<HTMLElement>,
            link: {
                title: React.ReactNode;
                href: string;
            }
        ) => {
            e.preventDefault();
        },
        []
    );

    const Anchors = React.useCallback((intros: Introduction[]) => {
        return intros && intros.length ? (
            <Anchor
                style={{ position: "fixed", right: 6, top: 66, padding: 10 }}
                offsetTop={50}
                onClick={handleClick}
            >
                {intros.map((item) => (
                    <Anchor.Link
                        key={item.ti}
                        href={`#${item.ti}`}
                        title={item.ti}
                    />
                ))}
            </Anchor>
        ) : null;
    }, [handleClick]);

    return (
        <Spin spinning={loading}>
            {descs?.introduction && descs?.introduction.length ? (
                <>
                    {Anchors(descs.introduction)}
                    {descs.introduction.map((intro, index) => {
                        return (
                            <div
                                style={{ marginBottom: 24 }}
                                key={index}
                                id={intro.ti}
                            >
                                <Typography.Title
                                    style={{ color: "#e7e7e7" }}
                                    level={5}
                                >
                                    {intro.ti}
                                </Typography.Title>
                                <div
                                    style={{
                                        color: "#c0c0c0",
                                        marginLeft: 32,
                                        fontSize: 15,
                                        lineHeight: 2,
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: intro.txt
                                            ? intro.txt.replaceAll(
                                                  "\n",
                                                  "<br/>"
                                              )
                                            : "",
                                    }}
                                ></div>
                            </div>
                        );
                    })}
                </>
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default SingerDesc;
