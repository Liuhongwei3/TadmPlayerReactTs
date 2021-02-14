import { Empty, Spin, Typography } from "antd";
import React from "react";
import reqs from "../../api/req";
import { notify } from "../../utils";
import { ISingerDesc } from "./type";

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
                    "error",
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

    return (
        <Spin spinning={loading}>
            {descs?.introduction && descs?.introduction.length ? (
                descs.introduction.map((intro, index) => {
                    return (
                        <div style={{ marginBottom: 24 }} key={index}>
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
                                    __html: intro.txt.replaceAll("\n", "<br/>"),
                                }}
                            ></div>
                        </div>
                    );
                })
            ) : (
                <Empty />
            )}
        </Spin>
    );
};

export default SingerDesc;
