export interface Observer {
  /**
   * Notification function of the observer, called by its subjects
   */
  notify(data: any);
}
