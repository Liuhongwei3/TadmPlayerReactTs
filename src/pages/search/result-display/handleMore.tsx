import React from "react";
import { Button } from "antd";
import StyledDivider from "../../../components/StyledDivider";

interface IProps {
    loading: boolean;
    resCount: number;
    limit: number;
    setLimit: Function;
}

const HandleMore: React.FC<IProps> = (props: IProps) => {
    const { loading, resCount, limit, setLimit } = props;

    return resCount ? (
        <>
            <StyledDivider />
            <Button
                style={{ margin: "0 auto", display: "flex" }}
                type="primary"
                disabled={limit >= resCount}
                loading={loading}
                onClick={() => setLimit(limit + 12)}
            >
                Loading More
            </Button>
        </>
    ) : null;
};

export default HandleMore;
