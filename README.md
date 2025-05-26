A[**LLMではない，人間の意味理解や想像をもつAIボット**]:::start

    A --> B[**民衆のモデル化（青系統）**]:::process1
    A --> C[**【実際の対処にあたる】（グラフ付き文書画像）**]:::process2_direct

    B --> B1[詳細説明画像（テキスト画像）]:::step1_detail
    B1 --> B2[【実際の対処にあたる】（グラフ付き文書画像）]:::step1_actual_dealing

    B2 --> D[**見積もり（最下部）**]:::result
    C --> D:::result

    classDef start fill:#ADD8E6,stroke:#000,stroke-width:2px;
    classDef process1 fill:#ADD8E6,stroke:#000,stroke-width:2px;
    classDef process2_direct fill:#D3D3D3,stroke:#000,stroke-width:2px;
    classDef step1_detail fill:#D3D3D3,stroke:#000,stroke-width:1px;
    classDef step1_actual_dealing fill:#D3D3D3,stroke:#000,stroke-width:1px;
    classDef result fill:#FFD700,stroke:#000,stroke-width:2px;
