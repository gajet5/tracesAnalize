import api from '@/services/api';

export default {
  async setTraces() {
    try {
      return await api().post();
    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
