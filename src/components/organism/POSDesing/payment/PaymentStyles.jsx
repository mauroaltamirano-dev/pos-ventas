import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: 100%;
  background: ${({ theme }) => theme.bgCards};
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  border: 1px solid ${({ theme }) => theme.border};

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    color: ${({ theme }) => theme.primary};
  }
`;

export const Area1 = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 20px;
  gap: 15px;

  .type-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${({ theme }) => theme.bg6};
    color: ${({ theme }) => theme.primary};
    padding: 6px 14px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
  }

  .client-box {
    text-align: right;
    display: flex;
    align-items: center;
    gap: 5px;
    label {
      font-size: 11px;
      color: ${({ theme }) => theme.colorSubtitle};
      display: block;
    }
    span {
      font-weight: 600;
      font-size: 14px;
    }
  }
`;

export const EditBtn = styled.button`
  background-color: ${({ theme }) => theme.primary};
  border: none;
  border-radius: 50%;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  color: #fff;

  .icon {
    font-size: 20px;
  }
`;

export const Area2 = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;
  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Area3 = styled.section`
  background: ${({ theme }) => theme.bgTotal};
  padding: 20px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .row {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    .val {
      font-weight: 700;
    }

    .val-tax {
      opacity: 0.7;
      font-weight: normal;
      font-size: 15px;
    }

    .error {
      color: #ef4444;
    }
    .success {
      color: #10b981;
    }
  }

  .change-row {
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px dashed ${({ theme }) => theme.border};
    .val {
      color: ${({ theme }) => theme.primary};
      font-size: 18px;
    }
  }
`;

export const Area4 = styled.section``;
