import React from "react";

import "./Parameters.css";
import Slider from "../VerticalSlider/VerticalSlider";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { updateParameters } from "../../store/parameter/actions";
import { RecommendationParameters } from "../../common/types";

interface ParametersProps {
  parameters: RecommendationParameters;
  updateParameters: typeof updateParameters;
}

const createDefaultParameters: () => RecommendationParameters = () => ({
  tempoVariance: 10,
  danceability: 0.5,
  energy: 0.5,
  popularity: 0.5,
  valence: 0.5,
});

const Parameters: React.FC<ParametersProps> = ({
  parameters,
  updateParameters,
}) => {
  const onParameterChange = (
    prop: keyof RecommendationParameters,
    value: number
  ) => {
    const newParams = createDefaultParameters();
    Object.assign(newParams, parameters);
    newParams[prop] = value;

    updateParameters(newParams);
  };

  return (
    <div className="parameter-section">
      <h2 className="section-title">Step 3: Adjust parameters</h2>
      <div className="parameters-surface">
        <div className="parameters-wrapper">
          <div className="parameter">
            <h4>Tempo variance</h4>
            <Slider
              id="1"
              min={2}
              max={10}
              step={2}
              value={parameters.tempoVariance}
              markValues={[2, 4, 6, 8, 10]}
              onChange={(value) =>
                onParameterChange("tempoVariance", parseInt(value))
              }
            />
          </div>
          <div className="parameter">
            <h4>Danceability</h4>
            <Slider
              id="1"
              min={0}
              max={1}
              step={0.1}
              value={parameters.danceability}
              markValues={[0, 0.2, 0.4, 0.6, 0.8, 1]}
              onChange={(value) =>
                onParameterChange("danceability", parseFloat(value))
              }
            />
          </div>
          <div className="parameter">
            <h4>Energy</h4>
            <Slider
              id="1"
              min={0}
              max={1}
              step={0.1}
              value={parameters.energy}
              markValues={[0, 0.2, 0.4, 0.6, 0.8, 1]}
              onChange={(value) =>
                onParameterChange("energy", parseFloat(value))
              }
            />
          </div>
          <div className="parameter">
            <h4>Popularity</h4>
            <Slider
              id="1"
              min={0}
              max={100}
              step={10}
              value={parameters.popularity}
              markValues={[0, 20, 40, 60, 80, 100]}
              onChange={(value) =>
                onParameterChange("popularity", parseInt(value))
              }
            />
          </div>
          <div className="parameter">
            <h4>Valence</h4>
            <Slider
              id="1"
              min={0}
              max={1}
              step={0.1}
              value={parameters.valence}
              markValues={[0, 0.2, 0.4, 0.6, 0.8, 1]}
              onChange={(value) =>
                onParameterChange("valence", parseFloat(value))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  parameters: state.parameters,
});

export default connect(mapStateToProps, { updateParameters })(Parameters);
