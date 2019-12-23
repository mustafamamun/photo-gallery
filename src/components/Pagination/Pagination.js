import React from "react";
import { get, range } from "lodash";

import ButtonComponent from "../ButtonComponent/ButtonComponent";

function Pagination({ currentPage, linkHeader, onSelect }) {
  const prevPage = currentPage - 1;
  const prev2Page = currentPage - 2;
  const nextPage = currentPage + 1;
  const next2Page = currentPage + 2;
  const lastPage = Number(get(linkHeader, "last._page", 0));

  return (
    <div className="text-center text-md-left mb-3">
      {get(linkHeader, "prev", null) && (
        <ButtonComponent text={"prev"} onSelect={() => onSelect(prevPage)} />
      )}

      {prev2Page > 1 && (
        <ButtonComponent
          text={1}
          isActive={currentPage === 1}
          onSelect={() => onSelect(1)}
        />
      )}
      {prev2Page > 2 && <span>...</span>}
      {range(
        prev2Page > 0 ? prev2Page : 1,
        currentPage + 2 < lastPage ? currentPage + 3 : lastPage + 1
      ).map((element, id) => {
        return (
          <ButtonComponent
            isActive={element === currentPage}
            key={id}
            text={element}
            onSelect={() => onSelect(element)}
          />
        );
      })}
      {lastPage > next2Page + 1 && <span>...</span>}
      {next2Page < lastPage && (
        <ButtonComponent text={lastPage} onSelect={() => onSelect(lastPage)} />
      )}
      {get(linkHeader, "next", null) && (
        <ButtonComponent text={"next"} onSelect={() => onSelect(nextPage)} />
      )}
    </div>
  );
}

export default Pagination;
