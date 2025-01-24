import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterParams: {
    populerBrandId: null,
    stateId: [],
    districtId: [],
    yom: [],
    brandId: [],
    modelId: [],
    minPrice: null,
    maxPrice: null,
  },
};

export const filterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addPopulerBrand: (state, action) => {
      state.filterParams.populerBrandId = action.payload;
    },
    addBrand: (state, action) => {
      let selectedBrands = state.filterParams.brandId;
      if (selectedBrands.includes(action.payload)) {
        selectedBrands = selectedBrands.filter(
          (brand) => brand !== action.payload
        );
      } else {
        selectedBrands = [...selectedBrands, action.payload];
      }
      state.filterParams.brandId = selectedBrands;
    },

    addModel: (state, action) => {
      let selectedModels = state.filterParams.modelId;
      if (selectedModels.includes(action.payload)) {
        selectedModels = selectedModels.filter(
          (model) => model !== action.payload
        );
      } else {
        selectedModels = [...selectedModels, action.payload];
      }
      state.filterParams.modelId = selectedModels;
    },

    addStates: (state, action) => {
      let selectedStates = state.filterParams.stateId;
      if (selectedStates.includes(action.payload)) {
        selectedStates = selectedStates.filter(
          (state) => state !== action.payload
        );
      } else {
        selectedStates = [...selectedStates, action.payload];
      }
      state.filterParams.stateId = selectedStates;
    },

    addDistricts: (state, action) => {
      let selectedDistrict = state.filterParams.districtId;
      if (selectedDistrict.includes(action.payload)) {
        selectedDistrict = selectedDistrict.filter(
          (district) => district !== action.payload
        );
      } else {
        selectedDistrict = [...selectedDistrict, action.payload];
      }
      state.filterParams.districtId = selectedDistrict;
    },

    addYom: (state, action) => {
      let selectedYom = state.filterParams.yom;
      if (selectedYom.includes(action.payload)) {
        selectedYom = selectedYom.filter((yom) => yom !== action.payload);
      } else {
        selectedYom = [...selectedYom, action.payload];
      }
      state.filterParams.yom = selectedYom;
    },
    addMinPrice: (state, action) => {
      state.filterParams.minPrice = action.payload;
    },
    addMaxPrice: (state, action) => {
      state.filterParams.maxPrice = action.payload;
    },
    resetFilterParams: (state) => {
      state.filterParams = initialState.filterParams;
    },
  },
});

export const {
  addPopulerBrand,
  addBrand,
  addModel,
  addStates,
  addDistricts,
  addYom,
  resetFilterParams,
  addMaxPrice,
  addMinPrice,
} = filterSlice.actions;
export default filterSlice.reducer;
