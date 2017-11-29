function sleep(duration) {
  let now = new Date().getTime();
  while (new Date().getTime() < now + duration) {
  /* do nothing */
  }
}

sleep(10000);
