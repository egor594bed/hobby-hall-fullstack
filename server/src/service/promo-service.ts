import PromoSwiper from "../models/PromoSwiper";

class PromoService {
  async getSlidersSrcs() {
    const srcsArr: PromoSlide[] = await PromoSwiper.find();
    return srcsArr;
  }
}

export default new PromoService();
