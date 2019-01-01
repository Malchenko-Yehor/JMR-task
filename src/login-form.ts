export class LoginForm {
  private wrapper: HTMLDivElement;
  private openButton: HTMLButtonElement;
  private closeButton: HTMLButtonElement;
  private closeButtonMobile: HTMLButtonElement;
  private loginButton: HTMLButtonElement;

  constructor() {
    this.wrapper = document.getElementsByClassName('login-form')[0] as HTMLDivElement;
    this.openButton = document.getElementsByClassName('start-button')[0] as HTMLButtonElement;
    this.closeButton = document.getElementsByClassName('login-form__close-button')[0] as HTMLButtonElement;
    this.closeButtonMobile = document.getElementsByClassName('login-form__close-button-mobile')[0] as HTMLButtonElement;
    this.loginButton = document.getElementsByClassName('login-button')[0] as HTMLButtonElement;

    this.setListeners();
  }

  private blur = (e) => {
    if (e) {
      (<HTMLButtonElement>e.target).blur();
    }
  }

  private open = (e?) => {
    this.blur(e);
    this.wrapper.classList.add('is-active');
  }

  private close = (e?) => {
    this.blur(e);
    this.wrapper.classList.remove('is-active');
  }

  private makeRequest(data: string) {
    const xhr = new XMLHttpRequest();
    const url = "https://recruitment-api.pyt1.stg.jmr.pl/login";

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const json = JSON.parse(xhr.responseText);
        window.alert(`
          message: ${json.message}
          status: ${json.status}
        `);
      }
    };

    xhr.send(data);
  }

  private grabInputData(): string {
    const inputs = document.getElementsByClassName('login-form__input');
    const email = (<HTMLInputElement>inputs[0]).value;
    const password = (<HTMLInputElement>inputs[1]).value;

    return JSON.stringify({
      login: email,
      password: password
    });
  }

  private setListeners(): void {
    this.openButton.addEventListener('click', this.open);
    this.closeButton.addEventListener('click', this.close);
    this.closeButtonMobile.addEventListener('click', this.close);


    this.loginButton.addEventListener('click', (e) => {
      const isValid = (<HTMLFormElement>document.getElementsByClassName('login-form__form')[0])
        .reportValidity();

      e.preventDefault();
      this.blur(e);

      if (isValid) this.makeRequest(this.grabInputData());
    });

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.close();
      }
    });

    document.addEventListener('mousedown', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const element = document.elementFromPoint(x, y);

      if (element === this.wrapper) this.close();
    });
  }
}