import { renderHook, act } from "@testing-library/react-hooks";

describe("Login Hooks", () => {
  let useLoading: () => any;
  let useUrlList: () => any;
  let useCredentials: () => any;

  const mockSend = jest.fn();
  const mockInvoke = jest.fn();

  beforeEach(() => {
    window.require = require;

    jest.resetAllMocks();

    jest.mock("electron", () => ({
      ipcRenderer: {
        send: mockSend,
        invoke: mockInvoke,
      },
    }));

    useLoading = require(".").useLoading;
    useUrlList = require(".").useUrlList;
    useCredentials = require(".").useCredentials;
  });

  describe("useLoading", () => {
    it("should set loading to false if success if false", () => {
      const { result } = renderHook(() => useLoading());

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);

      act(() => {
        result.current.setLoading(true);
        result.current.setSuccess(false);
      });

      expect(result.current.loading).toBe(false);
    });

    it("should not change loading if success is true", () => {
      const { result } = renderHook(() => useLoading());

      expect(result.current.loading).toBe(false);
      expect(result.current.success).toBe(true);

      act(() => {
        result.current.setLoading(true);
        result.current.setSuccess(true);
      });

      expect(result.current.loading).toBe(true);
    });
  });

  describe("useUrlList", () => {
    let response: Array<string>;

    beforeEach(() => {
      response = ["url1", "url2"];
      mockInvoke.mockImplementation((key, value) => {
        if (value === "urls") return Promise.resolve(response);
        if (value === "selectedUrl") return Promise.resolve(response[0]);
      });
    });

    it("should set the initial state on render", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useUrlList());

      await waitForNextUpdate();

      expect(result.current.initialList).toEqual(response);
      expect(result.current.urlList).toEqual(response);
      expect(result.current.selectedUrl).toBe(response[0]);
    });

    it("should send the selectedUrl to the ipcRenderer", async () => {
      const { result, waitForNextUpdate } = renderHook(() => useUrlList());

      await waitForNextUpdate();

      expect(result.current.selectedUrl).toBe("url1");

      act(() => {
        result.current.setSelectedUrl("new url");
      });

      expect(result.current.selectedUrl).toBe("new url");
    });

    describe("given dispatch is called", () => {
      it("should send an new value when added", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUrlList());

        await waitForNextUpdate();

        act(() => {
          result.current.dispatch({
            type: "ADD",
            payload: { newValue: "new url" },
          });
        });

        const expected = ["url1", "url2", "new url"];

        expect(result.current.urlList).toEqual(expected);
        expect(mockSend).toBeCalledWith("setStoreValue", {
          key: "urls",
          value: expected,
        });
      });

      it("should send an updated list when removed", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUrlList());

        await waitForNextUpdate();

        act(() => {
          result.current.dispatch({
            type: "REMOVE",
            payload: { newValue: "url1" },
          });
        });

        const expected = ["url2"];

        expect(result.current.urlList).toEqual(expected);
        expect(mockSend).toBeCalledWith("setStoreValue", {
          key: "urls",
          value: expected,
        });
      });

      it("should send a new list when a value is updated", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUrlList());

        await waitForNextUpdate();

        act(() => {
          result.current.dispatch({
            type: "UPDATE",
            payload: { newValue: "url3", previousValue: "url1" },
          });
        });

        const expected = ["url3", "url2"];

        expect(result.current.urlList).toEqual(expected);
        expect(mockSend).toBeCalledWith("setStoreValue", {
          key: "urls",
          value: expected,
        });
      });

      it("should reset to the original list", async () => {
        const { result, waitForNextUpdate } = renderHook(() => useUrlList());

        await waitForNextUpdate();

        const initialList = result.current.initialList;

        act(() => {
          result.current.dispatch({
            type: "RESET",
            payload: { newValue: "", initialValue: initialList },
          });
        });

        expect(result.current.urlList).toEqual(initialList);
        expect(mockSend).toBeCalledWith("setStoreValue", {
          key: "urls",
          value: initialList,
        });
      });
    });
  });

  describe("useCredentials", () => {
    it("should get the initial username and domain from ipcRenderer", async () => {
      mockInvoke.mockReturnValueOnce("username");
      mockInvoke.mockReturnValueOnce("domain");

      const { result, waitForNextUpdate } = renderHook(() => useCredentials());

      await waitForNextUpdate();

      expect(mockInvoke).toBeCalledWith("getStoreValue", "username");
      expect(mockInvoke).toBeCalledWith("getStoreValue", "domain");
      expect(mockInvoke).toBeCalledTimes(2);

      expect(result.current.username).toBe("username");
      expect(result.current.domain).toBe("domain");
      expect(result.current.password).toBe("");
    });

    it("should save the current values", () => {
      const { result } = renderHook(() => useCredentials());

      expect(result.current.username).toBe("");
      expect(result.current.domain).toBe("");
      expect(result.current.password).toBe("");

      act(() => {
        result.current.setUsername("user1");
        result.current.setDomain("domain.com");
        result.current.setPassword("password123");
        result.current.setSave(true);
      });

      expect(mockSend).toBeCalledWith("setStoreValue", {
        key: "username",
        value: "user1",
      });
      expect(mockSend).toBeCalledWith("setStoreValue", {
        key: "domain",
        value: "domain.com",
      });
    });

    it("should update credentials whenever save is ticked", () => {
      const { result } = renderHook(() => useCredentials());

      expect(result.current.username).toBe("");
      expect(result.current.domain).toBe("");
      expect(result.current.password).toBe("");

      act(() => {
        result.current.setSave(true);
      });

      expect(mockSend).not.toBeCalled();

      act(() => {
        result.current.setUsername("user1");
        result.current.setDomain("domain.com");
        result.current.setPassword("password123");
      });

      expect(mockSend).toBeCalledWith("setStoreValue", {
        key: "username",
        value: "user1",
      });
      expect(mockSend).toBeCalledWith("setStoreValue", {
        key: "domain",
        value: "domain.com",
      });
    });

    it("should not update credentials whenever save is not ticked", () => {
      const { result } = renderHook(() => useCredentials());

      expect(result.current.username).toBe("");
      expect(result.current.domain).toBe("");
      expect(result.current.password).toBe("");

      act(() => {
        result.current.setUsername("user1");
        result.current.setDomain("domain.com");
        result.current.setPassword("password123");
      });

      expect(mockSend).not.toBeCalled();
    });
  });
});
