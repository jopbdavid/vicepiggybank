import React from "react";

const ItemsForm = () => {
  return (
    <section className="w-1/2 ">
      <div className="collapse bg-base-200">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-slate-800 text-primary-content peer-checked:bg-slate-400 peer-checked:text-slate-800 flex">
          <button className="btn join-item mx-auto">Track New Item</button>
        </div>
        <div className="collapse-content bg-slate-800 text-slate-200 peer-checked:bg-slate-200 peer-checked:text-slate-800">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name of the Item:</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <label className="label">
              <span className="label-text-alt"></span>
              <span className="label-text-alt"></span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemsForm;
