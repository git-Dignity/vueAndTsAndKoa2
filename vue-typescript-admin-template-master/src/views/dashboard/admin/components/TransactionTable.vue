<!--
 * @Author: your name
 * @Date: 2021-05-04 23:23:38
 * @LastEditTime: 2021-08-31 18:10:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-typescript-admin-template-master\src\views\dashboard\admin\components\TransactionTable.vue
-->
<template>
  <el-table
    :data="list"
    style="width: 100%;padding-top: 15px;"
  >
    <el-table-column
      label="OrderID"
      min-width="200"
    >
      <template slot-scope="scope">
        {{ scope.row.orderId | orderNoFilter }}
      </template>
    </el-table-column>
    <el-table-column
      label="Price"
      width="195"
      align="center"
    >
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>
    <el-table-column
      label="Status"
      width="100"
      align="center"
    >
      <template slot-scope="{row}">
        <el-tag :type="row.status | transactionStatusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getTransactions } from "@/api/transactions";
import { ITransactionData } from "@/api/types";

@Component({
  name: "TransactionTable",
  filters: {
    transactionStatusFilter: (status: string) => {
      const statusMap: { [key: string]: string } = {
        success: "success",
        pending: "danger"
      };
      return statusMap[status];
    },
    orderNoFilter: (str: string) => str.substring(0, 30),
    // Input 10000 => Output "10,000"
    toThousandFilter: (num: number) => {
      return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
    }
  }
})
export default class extends Vue {
  private list: ITransactionData[] = []

  created() {
    this.fetchData();
  }

  private async fetchData() {
    const { data } = await getTransactions({ /* Your params here */ });
    if (data.length === 0 || !data?.length) return;
    this.list = data.items.slice(0, 8);
  }
}
</script>
