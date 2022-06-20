import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getRecipeDetail } from "../../redux/action/index";
import './Detail.css'

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { image, name, summary, health_score, steps, diets } = useSelector(
    (state) => state.detail
  );
  useEffect(() => {
    dispatch(getRecipeDetail(id));
  }, [dispatch, id]);

  return (
    <div className="main_divs">
      <div>
        <Link to="/home">
          <button className="btn_detail">Go back</button>
        </Link>
      </div>
      <div className="detail_div">
        <div className="div_h1">
          <h1 className="name">{name}</h1>
        </div>
        <div className="div_img">
          <img className="img_detail" src={image} alt={name} />
        </div>
        <div className="diets_detail">
          <p className="p_detail">{diets?.map((r) => r.name).join(", ")}</p>
        </div>
        <div className="div_score">
          <p className="p_score">
            <strong>Health Score:</strong> {`%` + health_score}
          </p>
        </div>
        <div className="div_summary">
          <strong>Summary:</strong>
          <p className="p_summary">{summary && summary.replace(/<[^>]+>/g, "")}</p>
        </div>
        <div className="div_steps">
          <strong>Steps:</strong>
          <p className="p_steps">{steps}</p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
