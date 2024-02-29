import React from "react";
import { cn, Pagination, PaginationItemType } from "@nextui-org/react";
import { ChevronIcon } from "./ChevronIcon";

export default function ButtonPaging({ totalPages, setParamPage, curentPage }) {
    const renderItem = ({
                            ref,
                            key,
                            value,
                            isActive,
                            setPage,
                            className,
                        }) => {

        if (value === PaginationItemType.DOTS) {
            return <button key={key} className={className}>...</button>;
        }

        // cursor is the default item
        return (
            <button
                key={key}
                ref={ref}
                className={cn(
                    className,
                    isActive &&
                    "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold w-8 h-8 m-3"
                )}
                onClick={() => {
                    setPage(value);
                    setParamPage(value);
                }}
                type="button"
            >
                {value}
            </button>
        );
    };

    return (
        <Pagination
            disableCursorAnimation
            total={totalPages}
            initialPage={curentPage}
            className="gap-2"
            radius="full"
            renderItem={renderItem}
            variant="light"
        />
    );
}
