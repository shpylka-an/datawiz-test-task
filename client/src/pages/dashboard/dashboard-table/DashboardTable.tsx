import React, { Component } from "react";
import { Table, Select } from "antd";
import { Employee } from "../../../types";
import ResizeableTitle from "../resizeable-title";
import { ResizeCallbackData } from "react-resizable";
import { ColumnProps } from "antd/es/table";

interface DashboardTableState {
  visibleColumns: String[];
  columns: ColumnProps<Employee>[];
}

class DashboardTable extends Component<{}, DashboardTableState> {
  state = {
    visibleColumns: ["Name", "Age", "Address"],
    columns: [
      {
        title: "Name",
        dataIndex: "name",
        sorter: {
          compare: (a: Employee, b: Employee) => a.name.localeCompare(b.name),
          multiple: 1
        },
        width: 100
      },
      {
        title: "Age",
        dataIndex: "age",
        sorter: {
          compare: (a: Employee, b: Employee) => a.age - b.age,
          multiple: 2
        },
        width: 50
      },
      {
        title: "Address",
        dataIndex: "address",
        sorter: {
          compare: (a: Employee, b: Employee) =>
            a.address.localeCompare(b.address),
          multiple: 3
        },
        width: 100
      }
    ]
  };

  components = {
    header: {
      cell: ResizeableTitle
    }
  };

  data: Employee[] = [
    {
      key: 1,
      name: "Anne Brown",
      age: 32,
      address: "New York No. 1 Lake Park"
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park"
    },
    {
      key: 3,
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park"
    },
    {
      key: 4,
      name: "Sherlock Holmes",
      age: 39,
      address: "221B Baker Street"
    }
  ];

  handleResize = (index: number) => (
    e: MouseEvent,
    { size }: ResizeCallbackData
  ) => {
    this.setState(({ columns }: DashboardTableState) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width
      };
      return { columns: nextColumns };
    });
  };

  changeVisibleColumns = (values: Array<String>) => {
    this.setState(({ columns }: DashboardTableState) => {
      return {
        visibleColumns: [...values],
        columns: [
          ...columns.map((column: any) => {
            return {
              ...column,
              className: !values.includes(column.title) ? "hidden-column" : ""
            };
          })
        ]
      };
    });
  };

  render() {
    const columns = this.state.columns.map((col: any, index) => {
      return {
        ...col,
        onHeaderCell: (column: any) => {
          return {
            width: column.width,
            onResize: this.handleResize(index)
          };
        }
      };
    });

    return (
      <>
        <p>Visible columns:</p>
        <Select
          mode="tags"
          style={{ width: 300, marginBottom: 20 }}
          value={this.state.visibleColumns}
          onChange={this.changeVisibleColumns}
        >
          {["Name", "Age", "Address"].map(item => (
            <Select.Option value={item}>{item}</Select.Option>
          ))}
        </Select>
        <Table<Employee>
          bordered
          components={this.components}
          columns={columns}
          dataSource={this.data}
          pagination={{
            pageSizeOptions: ["3", "10", "30", "40"],
            showSizeChanger: true
          }}
        />
      </>
    );
  }
}

export default DashboardTable;
